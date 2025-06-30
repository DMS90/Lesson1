export function Employee(props) {
    return (
        <>
            <div>Фамилия: {props.surname}</div>
            <div>Имя: {props.name}</div>
            <div>Отчество: {props.patronymic}</div>
            <div>Зарплата: {props.salary}</div>
        </>
    )
}