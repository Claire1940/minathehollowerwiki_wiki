import type { LucideIcon } from 'lucide-react'
import {
	CalendarClock,
	MonitorPlay,
	Star,
	Gamepad2,
	BookOpen,
	Swords,
	Skull,
} from 'lucide-react'

export interface NavigationItem {
	key: string
	path: string
	icon: LucideIcon
	isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: CalendarClock, isContentType: true },
	{ key: 'platforms', path: '/platforms', icon: MonitorPlay, isContentType: true },
	{ key: 'reviews', path: '/reviews', icon: Star, isContentType: true },
	{ key: 'demo', path: '/demo', icon: Gamepad2, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'combat', path: '/combat', icon: Swords, isContentType: true },
	{ key: 'bosses', path: '/bosses', icon: Skull, isContentType: true },
]

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
