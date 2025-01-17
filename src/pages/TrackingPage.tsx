import { SidebarMenu } from '@/components/SidebarMenu';
import SymptomCard from '@/components/SymptomCard';
import DataForm from '@/components/DataForm';

// TODO:  add multi select to form (medications, triggers / cause etc)

export default function TrackingPage() {
  const severityData = [
    {
      title: 'Changes in vision',
      note: 'Alterations in visual acuity, clarity, or perception. Blurriness, double vision, blind spots.',
      severityTitle: 'Mild',
      color: 'text-[#2D5101] bg-[#C0DD78]',
    },
    {
      title: 'Tooth Ache',
      note: 'Pain when chewing that worsens when drinking cold liquids. Pain seems to subside after a few minutes',
      severityTitle: 'Moderate',
      color: 'text-[#6D3A00] bg-[#F5CD6F]',
    },
    {
      title: 'Back pain',
      note: 'Tight muscles and some tenderness. Difficulty standing and walking',
      severityTitle: 'Severe',
      color: ' text-[#81371E] bg-[#F3C6BA]',
    },
    {
      title: 'Sore throat',
      note: 'Pain, scratchiness, or irritation of the throat that worsens when swallowing.',
      severityTitle: 'Very Severe',
      color: ' text-[#8C161E] bg-[#FFC3C9]',
    },
  ];

  const getSeverityData = () => {
    const randomNum = Math.floor(Math.random() * severityData.length);
    return severityData[randomNum];
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
          title={data.title}
          severityColor={data.color}
          severityTitle={data.severityTitle}
          note={data.note}
        />
      );
    }
    return symptomCards;
  };

  return (
    <div className='flex flex-row max-h-[90vh] '>
      <div className=' flex flex-col max-w-[410px] max-h-[1300px] w-fit text-left'>
        <SidebarMenu />

        <div className='flex flex-col gap-y-2 overflow-y-scroll scroll-smooth'>
          {generateSymptomCards(15)}
        </div>
      </div>
      <DataForm />
    </div>
  );
}
