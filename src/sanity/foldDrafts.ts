/**
 * Content types now use "live edit": changes save straight into the content with no
 * Draft / Publish step. Drafts created before that change (or by older workflows) are
 * folded into the saved content when someone presses "Push to live", so nothing is left
 * stranded and invisible.
 */

type SanityDoc = {_id: string; _type: string; [key: string]: unknown}

/** The small part of the Sanity client this needs (lets it be tested without a network). */
export interface FoldClient {
  fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T>
  transaction(): FoldTransaction
}

export interface FoldTransaction {
  createOrReplace(doc: SanityDoc): FoldTransaction
  delete(id: string): FoldTransaction
  commit(): Promise<unknown>
}

const SYSTEM_FIELDS = ['_rev', '_createdAt', '_updatedAt']

/**
 * Publishes every leftover draft of the given types into its saved (published) document
 * and removes the draft. Returns how many drafts were folded in.
 */
export async function foldDrafts(client: FoldClient, types: string[]): Promise<number> {
  const drafts = await client.fetch<SanityDoc[]>(
    `*[_id in path("drafts.**") && _type in $types]`,
    {types},
  )
  if (!drafts.length) return 0

  let tx = client.transaction()
  for (const draft of drafts) {
    const content: SanityDoc = {...draft}
    for (const field of SYSTEM_FIELDS) delete content[field]
    const publishedId = draft._id.replace(/^drafts\./, '')
    tx = tx.createOrReplace({...content, _id: publishedId}).delete(draft._id)
  }
  await tx.commit()
  return drafts.length
}
