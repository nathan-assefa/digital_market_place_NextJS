import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [],
  // routes: {
  //   admin: "/sell",
  // },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigialHippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 20000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
