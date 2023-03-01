import Card from "../Card/Card";

const ListCard = (props) => {
  const { listcard } = props;
  return (
    <ul>
      {listcard.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
export default ListCard;
