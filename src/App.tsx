import './App.css';
import { SidebarMenu } from './components/SidebarMenu';
import SymptomCard from './components/SymptomCard';

function App() {
  return (
    <>
      <div className='flex flex-col max-h-[1300px] w-fit text-left overflow-scroll'>
        <SidebarMenu />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
        <SymptomCard />
      </div>
    </>
  );
}

export default App;
