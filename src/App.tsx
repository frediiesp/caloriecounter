import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-3xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Container
          </h1>
        </div>
      </header>

      <section className="bg-lime-500 py-10 px-5">
        <div className="max-w-3xl mx-auto">
          <Form 
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-3xl">
        <ActivityList
          activities={state.activities}
        />
      </section>
    </>
  )
}

export default App
