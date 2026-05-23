// =============================================================================
// amplify/storage/resource.js
// =============================================================================
// This file defines your S3 bucket using Amplify's defineStorage helper.
// Think of this as the "blueprint" for your bucket — Amplify reads it and
// creates the real AWS infrastructure to match.

import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  // This name is used internally by Amplify to identify this storage resource.
  // Your actual S3 bucket will get a longer auto-generated name like:
  //   portfolioassets-[random-hash]-[environment]
  name: "portfolioAssets",

  // `access` controls who is allowed to do what with files in the bucket.
  // We're using a path prefix "media/*" to cover all our uploaded assets.
  access: (allow) => ({
    // "media/*" means: any file inside the /media/ folder in the bucket.
    // allow.guest.to(["read"]) means: anyone visiting your site (even without
    // logging in) can READ (download/view) these files.
    "media/*": [allow.guest.to(["read"])],
    "assets/*": [allow.guest.to(["read"])],
  }),
});