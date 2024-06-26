import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({activities}: ActivityListProps) {

    const categoryName = useMemo(() =>
         (category: Activity['category']) => categories.map(c => c.id === category ? c.name : '')
    ,[activities])

    return (
        <>
            <h2 className='text-2xl font-bold text-slate-600 text-center'>
                Food and Activities
            </h2>

            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-8 py-1 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="text-xl font-bold pt-2 ">
                            {activity.name}
                        </p>
                        <p className="font-black text-2xl text-lime-500">
                            {activity.calories}
                            <span> Calories</span>
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button>
                            <PencilSquareIcon className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
