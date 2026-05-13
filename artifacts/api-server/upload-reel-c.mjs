import { Storage } from "@google-cloud/storage";
import { readFileSync } from "fs";

// Use sidecar credentials (same pattern as api-server's objectStorage.ts)
const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: { url: `${REPLIT_SIDECAR_ENDPOINT}/credential`, format: { type: "json", subject_token_field_name: "access_token" } },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

const searchPath = process.env.PUBLIC_OBJECT_SEARCH_PATHS.split(",")[0].trim();
// /replit-objstore-XXX/public  ->  bucket=replit-objstore-XXX, prefix=public
const m = searchPath.match(/^\/([^/]+)\/(.+)$/);
const bucketName = m[1];
const prefix = m[2];
const objectName = `${prefix}/videos/reel-c.mov`;

console.log("Uploading to", bucketName, objectName);
const data = readFileSync("/tmp/reel-c.mov");
await storage.bucket(bucketName).file(objectName).save(data, {
  contentType: "video/quicktime",
  resumable: false,
});
console.log("OK, size =", data.length);
