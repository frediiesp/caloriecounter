import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch}: FormProps) {

    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: {newActivity: activity} })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form className="space-y-5 bg-white shadow p-7 rounded-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="category" className="font-bold">Category:</label>
                <select 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    id="category"
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="name" className="font-bold">Activity:</label>
                <input 
                    value={activity.name}
                    onChange={handleChange}
                    type="text" 
                    id="name" 
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Food, Orange Juice, Salad, Exercice, Weights, Bicycle"
                />
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="calories" className="font-bold">Calories:</label>
                <input 
                    value={activity.calories}
                    onChange={handleChange}
                    type="number" 
                    id="calories" 
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories. ej. 100 our 300"
                />
            </div>
            <input
                type="submit"
                value={activity.category === 1 ? 'Save Food' : 'Save Excercise' }
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-30"
                disabled={!isValidActivity()}
            />
        </form>
    )
}
