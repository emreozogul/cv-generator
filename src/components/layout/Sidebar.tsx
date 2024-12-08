import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
    UserCircle,
    GraduationCap,
    Briefcase,
    Wrench,
    FolderGit2,
    Palette,
    Download,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLayoutStore } from '@/lib/store/layout-store'

const navigation = [
    { name: 'Personal Info', to: '/', icon: UserCircle },
    { name: 'Education', to: '/education', icon: GraduationCap },
    { name: 'Experience', to: '/experience', icon: Briefcase },
    { name: 'Skills', to: '/skills', icon: Wrench },
    { name: 'Projects', to: '/projects', icon: FolderGit2 },
    { name: 'Customize', to: '/customize', icon: Palette },
    { name: 'Export', to: '/export', icon: Download },
]

export default function Sidebar() {
    const { isSidebarCollapsed, toggleSidebar } = useLayoutStore()

    return (
        <div className={cn(
            "h-full border-r bg-muted/40 transition-all duration-300 relative",
            isSidebarCollapsed ? "w-[60px]" : "w-[200px]"
        )}>
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-3 h-6 w-6 rounded-full p-0 bg-black/30 text-white hover:bg-black/80 hover:text-white"
                onClick={toggleSidebar}
            >
                {isSidebarCollapsed ? (
                    <ChevronRight className="h-3 w-3" />
                ) : (
                    <ChevronLeft className="h-3 w-3" />
                )}
            </Button>

            <nav className="space-y-1 p-2 mt-12">
                {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted',
                                    isActive ? 'bg-muted font-medium' : 'text-muted-foreground',
                                    isSidebarCollapsed && 'justify-center'
                                )
                            }
                        >
                            <Icon className="h-6 w-6" />
                            {!isSidebarCollapsed && <span>{item.name}</span>}
                        </NavLink>
                    )
                })}
            </nav>
        </div>
    )
}