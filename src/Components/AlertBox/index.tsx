import Alert from "react-bootstrap/Alert";

interface AlertBoxProps {
  text: string;
}
const AlertBox = ({ text }: AlertBoxProps) => {
  return (
    <Alert key={"danger"} variant={"danger"} className="alert alert-danger">
      <strong>Duplicate(s) detected!</strong>
      {text}
    </Alert>
  );
};

export default AlertBox;
