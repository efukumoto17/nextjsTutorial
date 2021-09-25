import { getSession } from "next-auth/client";
import Router from "next/router";

export const customPut = async (url, ctx) => {
   const session = await getSession(ctx);

   if (!session?.user) {
      ctx.res?.writeHead(302, {
         Location: "/login",
      });
      ctx.res?.end();
      return;
   }

   const resp = await fetch(url, {
      method: "PUT",
      headers: {
         Authorization: `Bearer ${session.user.accessToken}`,
      },
   });
   console.log(resp)
   if (resp.status === 401 && !ctx.req) {
      Router.replace("/login");
      return {};
   }

   if (resp.status === 401 && ctx.req) {
      ctx.res?.writeHead(302, {
         Location: "/login",
      });
      ctx.res?.end();
      return;
   }

   return { message: "Success" };
};
