import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../features/counterSlice";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3">Counter Example</Card.Title>
        <Card.Text className="text-center fs-4 mb-4">
          Value: <strong className="text-primary">{count}</strong>
        </Card.Text>
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <ButtonGroup size="lg">
              <Button variant="success" onClick={() => dispatch(increment())}>
                <i className="bi bi-plus"></i> +
              </Button>
              <Button variant="danger" onClick={() => dispatch(decrement())}>
                <i className="bi bi-dash"></i> -
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
