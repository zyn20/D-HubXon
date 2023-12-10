import TaskCard from './Cardcourse';
import logo1 from './logo1.png';
function CardPage() {
    const cards = [
      {
        title: "Task Title 1",
        description: "Description for task 1...",
        imageSrc: logo1,
      },
      {
        title: "Task Title 2",
        description: "Description for task 2...",
        imageSrc: logo1,
      },
      {
        title: "Task Title 3",
        description: "Description for task 3...",
        imageSrc: logo1,
      },
      // Add as many cards as needed
    ];
  
    return (
    
      <>
      <div className="container mx-auto p-4">
    <div className="flex justify-center">
      <h2 className="text-2xl font-bold mb-4">All Courses</h2> {/* Add the heading */}
    </div>
    <div className="flex flex-wrap -mx-2">
      {cards.map((card, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
          <TaskCard title={card.title} description={card.description} imageSrc={card.imageSrc} />
        </div>
      ))}
    </div>
  </div>
  
  
      </>
    
    );
  }
  
  export default CardPage;