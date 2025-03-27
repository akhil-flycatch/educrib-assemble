import { NOT_FOUND_TEXT } from '@utils/defaults'
import React from 'react'

export default function Info({ icon, label, value, reverse = false }: { icon: React.ReactNode, label?: string, value: string | React.ReactNode, reverse?: boolean }) {
    const layoutClass = reverse ? 'flex-col-reverse' : 'flex-col';
    return (
        <div className="flex items-center space-x-5 my-3">
            <div className="bg-light rounded-sm text-lavender p-4">{icon}</div>
            <div className={`flex ${layoutClass} space-y-1`}>
                {label && <span className="text-sm text-lavender">{label}</span>}
                <h2 className="font-semibold">{value || NOT_FOUND_TEXT}</h2>
            </div>
        </div>
    )
}
