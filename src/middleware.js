import { NextResponse } from 'next/server';


export async function middleware(request){
    
        const authtoken = request.cookies.get('authToken')?.value;   

        const isLoggedin = authtoken !== undefined;
        const loogedinUserNotaccess= request.nextUrl.pathname === '/login1' || request.nextUrl.pathname === '/signup';
        
        if(loogedinUserNotaccess){
            if (authtoken){
                return NextResponse.redirect(new URL('/', request.url));
            }
        }else{
            if(!authtoken){
                return NextResponse.redirect(new URL('/login1', request.url)); 
            }
        }
        // Optionally, you can return a different response for failed verification
}

export const config = {
    matcher: ['/bloodcamp/:path*', '/login1/:path*', '/signup/:path*', '/bookAp/:path*', '/bloodreq/:path*','/doctoradmin/:path*' ],
  }
