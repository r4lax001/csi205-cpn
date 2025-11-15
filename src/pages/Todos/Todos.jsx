import { useEffect, useState } from "react";
import { fetchTodos } from "../../data/todos"; // ดึงข้อมูลจาก data
import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import "./Todos.css";

const Todos = () => {
    // state
    const [todos, setTodos] = useState([])
    const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // โหลดข้อมูลจาก data
    useEffect(() => {
        const data = fetchTodos().map((t) => ({
            id: t.id,
            title: t.title,
            status: t.completed ? "done" : "waiting",
        }));
        setTodos(data);
    }, []);

    // กรองเฉพาะ waiting ถ้าผู้ใช้เปิดสวิตช์
    const filteredTodos = showOnlyWaiting
        ? todos.filter((t) => t.status === "waiting")
        : todos;

    // แบ่งหน้า
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentTodos = filteredTodos.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // toggle สถานะ done / waiting
    const toggleStatus = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        status: todo.status === "waiting" ? "done" : "waiting",
                    }
                    : todo
            )
        );
    };

    // ลบ todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // เพิ่ม todo
    const addTodo = () => {
        if (newTitle.trim() === "") return;
        const newTodo = {
            id: todos.length + 1,
            title: newTitle,
            status: "waiting",
        };
        setTodos([...todos, newTodo]);
        setShowModal(false);
        setNewTitle("");
    };

    return (
        <>
            {/* filters */}
            <Form className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={
                            <>
                                Show only{" "}
                                <Badge bg="warning" text="dark">
                                    waiting <i className="bi bi-clock"></i>
                                </Badge>
                            </>
                        }
                        checked={showOnlyWaiting}
                        onChange={() => {
                            setShowOnlyWaiting(!showOnlyWaiting);
                            setPage(1);
                        }}
                    />


                    <Form.Select aria-label="Default select example" className="w-25" value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={5}>5 items per page</option>
                        <option value={10}>10 items per page</option>
                        <option value={50}>50 items per page</option>
                        <option value={100}>100 items per page</option>
                    </Form.Select>
                </div>
            </Form>

            {/* table */}
            <div>
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: "3rem" }}>ID</th>
                            <th className="text-center">Title</th>
                            <th className="text-end" style={{ width: "10rem" }}>Completed
                                <Button variant="primary" size="sm" className="ms-2" onClick={() => setShowModal(true)}>
                                    + </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTodos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td className="text-center align-middle">
                                        <h5><Badge bg="secondary">{todo.id}</Badge></h5>
                                    </td>
                                    <td className="text-start align-middle">{todo.title}</td>
                                    <td className="text-end align-middle">
                                        {todo.status === "waiting" ? (
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => toggleStatus(todo.id)}
                                            >
                                                waiting <i className="bi bi-clock"></i>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => toggleStatus(todo.id)}
                                            >
                                                done <i className="bi bi-check-lg text-white"></i>
                                            </Button>
                                        )}{" "}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            <i class="bi bi-trash3-fill text-white"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>

            {/* page control */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                >
                    First
                </Button>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <span>
                    Page {page} / {totalPages}
                </span>

                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                >
                    Last
                </Button>
            </div>

            {/* ===== Modal Section ===== */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type your todo title here..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addTodo}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Todos;