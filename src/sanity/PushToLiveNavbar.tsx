'use client'

import {useCallback, useEffect, useState} from 'react'
import {Box, Button, Flex, Text} from '@sanity/ui'
import {useToast} from '@sanity/ui/toast'
import {RocketIcon} from '@sanity/icons/Rocket'
import {useClient, useCurrentUser, type NavbarProps} from 'sanity'

// Content that appears on the website. Editing any of these creates something to push.
const CONTENT_TYPES = ['homePage', 'siteSettings', 'product', 'page', 'codeSnippet']

const STATUS_QUERY = `{
  "last": *[_id == "liveRelease"][0].requestedAt,
  "pending": count(*[
    _type in $types &&
    !(_id in path("drafts.**")) &&
    _updatedAt > coalesce(*[_id == "liveRelease"][0].requestedAt, "1970-01-01T00:00:00Z")
  ])
}`

function formatWhen(iso: string | null): string {
  if (!iso) return 'never'
  return new Date(iso).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})
}

/**
 * Slim bar above the Studio navbar. "Publish" in the Studio saves content to Sanity;
 * this button is what makes it go live on the website.
 */
function PushToLiveBar() {
  const client = useClient({apiVersion: '2025-01-01'})
  const user = useCurrentUser()
  const toast = useToast()

  const [last, setLast] = useState<string | null>(null)
  const [pending, setPending] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const status = await client.fetch<{last: string | null; pending: number}>(STATUS_QUERY, {
        types: CONTENT_TYPES,
      })
      setLast(status.last)
      setPending(status.pending)
    } catch {
      // Status is a convenience; the button still works without it
    }
  }, [client])

  useEffect(() => {
    refresh()
    const timer = window.setInterval(refresh, 20000)
    return () => window.clearInterval(timer)
  }, [refresh])

  const pushLive = async () => {
    setBusy(true)
    try {
      await client.createOrReplace({
        _id: 'liveRelease',
        _type: 'liveRelease',
        requestedAt: new Date().toISOString(),
        requestedBy: user?.email || user?.name || 'unknown',
      })
      toast.push({
        status: 'success',
        title: 'Pushed to live',
        description: 'The website will show your published changes in a few seconds.',
      })
      await refresh()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Could not push to live',
        description: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setBusy(false)
    }
  }

  const hasPending = (pending ?? 0) > 0

  return (
    <Box paddingX={3} paddingY={2} style={{borderBottom: '1px solid var(--card-border-color)'}}>
      <Flex align="center" justify="space-between" gap={3} wrap="wrap">
        <Text size={1} muted>
          {hasPending
            ? `${pending} published change${pending === 1 ? '' : 's'} not live yet · last pushed ${formatWhen(last)}`
            : `Website is up to date · last pushed ${formatWhen(last)}`}
        </Text>
        <Button
          icon={RocketIcon}
          text="Push to live"
          tone={hasPending ? 'positive' : 'default'}
          mode={hasPending ? 'default' : 'ghost'}
          loading={busy}
          disabled={busy}
          onClick={pushLive}
          fontSize={1}
          padding={2}
        />
      </Flex>
    </Box>
  )
}

export function PushToLiveNavbar(props: NavbarProps) {
  return (
    <Flex direction="column">
      <PushToLiveBar />
      {props.renderDefault(props)}
    </Flex>
  )
}
