import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui'
import Sidebar from './Sidebar'
import { CVPreview } from '../cv-preview/CVPreview'
import { useLayoutStore } from '@/lib/store/layout-store'

export function MainLayout() {
    const { isSidebarCollapsed } = useLayoutStore()

    return (
        <div className="min-h-screen h-screen min-w-[800px] flex">
            <Sidebar />

            <main className="flex-1 flex min-h-0">

                <div className="w-3/5 h-full p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </div>

                <div className="h-full w-full p-4 md:p-6 overflow-y-auto bg-muted/30">
                    <CVPreview />
                </div>
            </main>
        </div>
    )
} 