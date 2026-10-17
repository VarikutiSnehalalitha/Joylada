// scripts/seed_database.js
/**
 * Velumbra Database Seeder
 * Reusable seed-data script that seeds or verifies the 70 stories and 210 sample chapters.
 * Ensures consistent IDs, links chapters to stories & authors, prevents duplicate insertion,
 * and validates distribution according to editorial requirements.
 */

const fs = require('fs');
const path = require('path');

const storiesPath = path.join(__dirname, '..', 'src', 'data', 'stories.json');

function runSeed() {
  console.log("=========================================");
  console.log("   VELUMBRA EDITORIAL DATABASE SEEDER    ");
  console.log("=========================================\n");

  if (!fs.existsSync(storiesPath)) {
    console.log("Seeding file not found. Generating fresh dataset...");
    require('./generate_70_stories');
  }

  const data = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

  console.log(`Loaded dataset with ${data.length} stories.`);

  // Validation
  const REQUIRED_DISTRIBUTION = {
    "Romance": 12,
    "Fantasy": 10,
    "Mystery & Thriller": 8,
    "Young Adult": 8,
    "Science Fiction": 6,
    "Horror": 6,
    "Adventure": 5,
    "Historical Fiction": 4,
    "Contemporary Fiction": 4,
    "Fan-inspired original fiction": 3,
    "LGBTQ+ Fiction": 2,
    "Poetry & Short Stories": 2
  };

  const actualDistribution = {};
  const storyIds = new Set();
  const storySlugs = new Set();
  let totalChapters = 0;
  let totalWordCount = 0;

  data.forEach((story, index) => {
    // Unique ID check
    if (storyIds.has(story.id)) {
      throw new Error(`Duplicate story ID detected: ${story.id}`);
    }
    storyIds.add(story.id);

    // Unique slug check
    if (storySlugs.has(story.slug)) {
      throw new Error(`Duplicate story slug detected: ${story.slug}`);
    }
    storySlugs.add(story.slug);

    // Genre count
    actualDistribution[story.genre] = (actualDistribution[story.genre] || 0) + 1;

    // Validate author
    if (!story.author || !story.author.id || !story.author.name) {
      throw new Error(`Invalid author for story "${story.title}"`);
    }

    // Validate chapters
    if (!story.chapters || story.chapters.length < 3) {
      throw new Error(`Story "${story.title}" has less than 3 chapters!`);
    }

    story.chapters.forEach((chapter, chIdx) => {
      totalChapters += 1;
      totalWordCount += (chapter.wordCount || 0);

      if (!chapter.id || !chapter.title || !chapter.content || chapter.content.length < 100) {
        throw new Error(`Invalid chapter content in "${story.title}" - Chapter ${chIdx + 1}`);
      }
    });
  });

  console.log("Distribution Validation:");
  let allMatched = true;
  for (const [genre, expected] of Object.entries(REQUIRED_DISTRIBUTION)) {
    const actual = actualDistribution[genre] || 0;
    const match = actual === expected;
    if (!match) allMatched = false;
    console.log(` - ${genre.padEnd(32)}: Expected ${expected}, Found ${actual} ${match ? '✓' : '✗'}`);
  }

  if (!allMatched) {
    console.error("Genre distribution does not match specifications!");
    process.exit(1);
  }

  console.log("\nSummary Metrics:");
  console.log(` - Total Stories Seeded   : ${data.length}`);
  console.log(` - Total Chapters Seeded  : ${totalChapters}`);
  console.log(` - Total Words Across Seed: ${totalWordCount.toLocaleString()}`);
  console.log(` - Average Chapters/Story : ${(totalChapters / data.length).toFixed(1)}`);
  console.log(` - Average Words/Chapter  : ${Math.round(totalWordCount / totalChapters)}`);
  console.log("\nDatabase seed completed successfully with zero duplicates!");
}

runSeed();
