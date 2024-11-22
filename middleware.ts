import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/*
export async function middleware(request: NextRequest) {
    if(!request.cookies.get('session')) {
        const response = NextResponse.next();
        const myWixClient = createClient ({ 
            auth: OAuthStrategy({
                clientId: process.env.Wix_API_ID!
            })
        });
        
        response.cookies.set(
            'session',
            JSON.stringify(await myWixClient.auth.generateVisitorTokens())
        );
        return response;
    }
}
*/


const protectedRoutes =createRouteMatcher( [
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'
]

);


export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) await auth.protect()
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}