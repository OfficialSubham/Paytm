import { SidebarItem } from '../../components/SidebarItem'
import { Home } from '../../JSXICONS/Home'
import { Transaction } from '../../JSXICONS/Transaction'
import { Swap } from '../../JSXICONS/Transfer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col sm:flex-row h-full'>
      <div className='sm:pt-5 flex justify-center sm:justify-start sm:items-start items-center sm:flex-col gap-5 pl-3 sm:min-w-52 sm:flex-grow-0 h-14 sm:h-full sm:border-r-2 border-b-2 sm:border-b-0'>
        <SidebarItem title='Home' icon={<Home />} href='/dashboard' />
        <SidebarItem title='Transfer' icon={<Swap />} href='/transfer' />
        <SidebarItem title='Transaction' icon={<Transaction />} href='/transaction' />
        <SidebarItem title='P2P Transfer' icon={<Swap />} href='/p2ptransaction' />
      </div>
      <div className=' flex-1 h-full p-3'>
        {children}
      </div>
    </div>
  )
}

