import Link from "next/link"
import { SyaLogo } from "./SyaLogo"

export function SiteFooter() {
    return (
        <footer className="border-t md:py-0 px-6">
            <div className="text-center text-sm leading-loose text-muted-foreground md:text-left space-y-1">

                <div className="py-3">
                    <SyaLogo className="text-black dark:text-white inline-block" /> Copyright © {new Date().getFullYear()} | Created By <Link href="https://sya.vercel.app" className="underline">Syariful Kamaluddin</Link> | Powered By  <Link href="https://syabytes.vercel.app" className="underline">syaBytes</Link>
                </div>
            </div>


        </footer>
    )
}