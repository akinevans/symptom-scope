// import { EllipsisVertical } from 'lucide-react';

export default function SeverityTag(props) {
  const mild = (
    <p
      className={`${props.classname} mt-0  w-[100px] text-[14px] text-[#476C3B] bg-[#ACD99E] text-center rounded-[6px]`}
    >
      Mild
    </p>
  );
  const moderate = (
    <p
      className={`${props.classname} mt-0 w-[100px] text-[14px] text-[#D29104] bg-[#FFDF9A] text-center rounded-[6px]`}
    >
      Moderate
    </p>
  );
  const severe = (
    <p
      className={`${props.classname} mt-0 w-[100px] text-[14px] text-[#92411b] bg-[#ffc3a7] text-center rounded-[6px]`}
    >
      Severe
    </p>
  );
  const verySevere = (
    <p
      className={`${props.classname} mt-0 w-[100px] text-[14px] text-[#D80000] bg-[#F19999] text-center rounded-[6px]`}
    >
      Very Severe
    </p>
  );

  const getRandomSeverity = () => {
    const severity = [mild, moderate, severe, verySevere];
    return severity[Math.floor(Math.random() * severity.length)];
  };

  return (
    <div className='mt-0 flex justify-center items-center h-fit w-fit'>
      {getRandomSeverity()}
      {/* <a href=''>
          <EllipsisVertical color='#65768c' className='mr-[-15px]' />
        </a> */}
    </div>
  );
}
