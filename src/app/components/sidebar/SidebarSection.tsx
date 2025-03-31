
import SidebarItem from './SidebarItem'



export default function SidebarSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="px-4 py-2">
      <h3 className="text-xs text-gray-400 mb-2 uppercase">{title}</h3>
      <div className="flex flex-col gap-1">
        {items.map((item, idx) => (
          <SidebarItem key={idx} label={item} />
        ))}
      </div>
    </div>
  )
}

