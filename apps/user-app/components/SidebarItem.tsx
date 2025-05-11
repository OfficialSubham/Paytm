"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export const SidebarItem = ({ icon, href, title }: { icon: React.ReactNode, href: string, title: string }) => {
  const pathName = usePathname();
  const [isSelected, setSelected] = useState(false);
  //console.log(pathName, href);
  useEffect(() => {
    if (pathName === href) {
      setSelected(true);
    }
    else {
      setSelected(false)
    }
  }, [pathName, href])
  const router = useRouter()
  return (
    <div className='flex items-center gap-5' onClick={() => {
      router.push(href)
    }}>
      <span className={`flex items-center justify-center cursor-pointer`} style={{
        color: isSelected ? "#6a51a6" : "#000000"
      }}>
        {icon} {title}

      </span>

    </div >
  )
}

