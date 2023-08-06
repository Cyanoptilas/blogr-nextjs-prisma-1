import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  //   const session = await getSession({ req });
  const session = await getServerSession(req, res, options);

  console.log("session!!!!!!!!!!!!!!");
  console.log(session);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
