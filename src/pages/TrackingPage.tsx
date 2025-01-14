import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';

export default function TrackingPage() {
  const severityData = [
    {
      title: 'Mild',
      color: 'text-[#476C3B] bg-[#ACD99E]',
    },
    {
      title: 'Moderate',
      color: 'text-[#D29104] bg-[#FFDF9A]',
    },
    {
      title: 'Severe',
      color: ' text-[#92411b] bg-[#ffc3a7]',
    },
    {
      title: 'Very Severe',
      color: ' text-[#D80000] bg-[#F19999]',
    },
  ];

  const getSeverityData = () => {
    const randomNum = Math.floor(Math.random() * severityData.length);
    return severityData[randomNum];
  };

  const getRandomTitle = () => {
    const titles = [
      'Fatigue',
      'Headache',
      'Chills',
      'Fever',
      'Sore Throat',
      'Muscle Aches',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  function getRandomDate(): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const randomDay = Math.floor(Math.random() * 28) + 1; // To ensure a valid day
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = Math.floor(Math.random() * 7) + 2018;

    return `${randomMonth} ${randomDay} ${randomYear}`;
  }

  const generateSymptomCards = (amount: number) => {
    const symptomCards = [];
    for (let i = 0; i < amount; i++) {
      const data = getSeverityData();

      symptomCards.push(
        <SymptomCard
          date={getRandomDate()}
          title={getRandomTitle()}
          severityColor={data.color}
          severityTitle={data.title}
        />
      );
    }
    return symptomCards;
  };

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col max-w-[410px] max-h-[1300px] w-fit text-left overflow-y-scroll'>
        <SidebarMenu />

        <div className='overflow-scroll'>{generateSymptomCards(15)}</div>
      </div>
      <DataForm />
    </div>
  );
}
