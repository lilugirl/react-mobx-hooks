import React,{useState,useContext} from "react";
import "./App.css";
import { useLocalStore, useObserver } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    bugs: ["Centipede"],
    addBug: (bug) =>{
      store.bugs.push(bug)
    },
    get bugsCount() {
      return store.bugs.length;
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugsHeader = () =>{
  const store = useContext(StoreContext);
  return useObserver(()=>(<h1>{store.bugsCount} Bugs!</h1>))
}

const BugsList = () => {
  const store = React.useContext(StoreContext);
  return useObserver(()=>(
    <ul>
      {store.bugs.map((bug, index) => (
        <li key={index}>{bug}</li>
      ))}
    </ul>
  ))
};

const BugsForm = () =>{
  const store = useContext(StoreContext);
  const [bug, setBug]=useState('')
  console.log(store)
  return <form onSubmit={(e)=>{
    
    store.addBug(bug);
    setBug('')
    e.preventDefault();

  }}>  
  <input placehoder="bugs" value={bug} onChange={(e)=>setBug(e.target.value)} />
  <button>Add</button>
  </form>
}

function App() {
  return (
    <StoreProvider>
      <main>
        <BugsHeader />
        <BugsForm/>
        <BugsList />
      </main>
    </StoreProvider>
  );
}

export default App;
