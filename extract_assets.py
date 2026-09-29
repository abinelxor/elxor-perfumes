from PIL import Image
import os

os.makedirs("extracted_assets", exist_ok=True)

# 1. Logo from first section:
# Size of first section: (1666, 944)
# Logo is in top-left: approx x: 60 to 380, y: 15 to 130
img1 = Image.open("first section of elxor.png")
w1, h1 = img1.size
logo_crop = img1.crop((70, 20, 360, 135))
logo_crop.save("extracted_assets/logo.png")

# Hero background / right visual
# The right perfume bottle in hero
hero_bottle = img1.crop((920, 120, 1640, 940))
hero_bottle.save("extracted_assets/hero_bottle.png")

# Full Hero background (cleaned / complete)
hero_full = img1.crop((700, 0, w1, h1))
hero_full.save("extracted_assets/hero_visual_full.png")

# 2. Second section: 4 product cards
# Size of second section: (2073, 758)
img2 = Image.open("second section of elxor.png")
w2, h2 = img2.size
print(f"Section 2 size: {w2}x{h2}")

# Let's inspect where the 4 cards are located
# There are 4 cards horizontally distributed
# Total width 2073, padding on left and right approx 100-120
# Let's crop each card image (the bottle box inside the card or the entire card):
# Card 1: NOIR ESSENCE: approx x: 110 to 570, y: 310 to 715 (bottle box y: 315 to 680)
# Let's crop the bottle visual inside each card:
# Card 1: x: 135 to 550, y: 315 to 675
c1_img = img2.crop((120, 315, 560, 675))
c1_img.save("extracted_assets/noir_essence.png")

# Card 2: ROYAL OUD: x: 590 to 1030, y: 315 to 675
c2_img = img2.crop((590, 315, 1030, 675))
c2_img.save("extracted_assets/royal_oud.png")

# Card 3: SILVER AMBRE: x: 1060 to 1500, y: 315 to 675
c3_img = img2.crop((1060, 315, 1500, 675))
c3_img.save("extracted_assets/silver_ambre.png")

# Card 4: VELVET ROUGE: x: 1530 to 1970, y: 315 to 675
c4_img = img2.crop((1530, 315, 1970, 675))
c4_img.save("extracted_assets/velvet_rouge.png")

# 3. Third section: Philosophy visual (right side with flowers and bottle)
# Size: 1665x944
img3 = Image.open("third section of elxor.png")
w3, h3 = img3.size
print(f"Section 3 size: {w3}x{h3}")
# Visual is on the right side approx x: 780 to 1660, y: 100 to 580
phil_visual = img3.crop((850, 90, 1620, 580))
phil_visual.save("extracted_assets/philosophy_visual.png")

# 4. Fourth section: Experience visual (right side bottle on water with liquid gold)
# Size: 2073x758
img4 = Image.open("fourth section of elxor.png")
w4, h4 = img4.size
print(f"Section 4 size: {w4}x{h4}")
# Bottle and water reflection on the right:
exp_visual = img4.crop((1250, 140, 2030, 755))
exp_visual.save("extracted_assets/experience_visual.png")

# 5. Fifth section: Footer background
# Size: 2073x758
img5 = Image.open("fifth section of elxor.png")
w5, h5 = img5.size
print(f"Section 5 size: {w5}x{h5}")
# Footer gold glow / rocks at bottom and edges
footer_bg = img5.crop((0, 0, w5, h5))
footer_bg.save("extracted_assets/footer_bg.png")

print("Assets extracted successfully!")
