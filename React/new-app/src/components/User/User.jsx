export function User(props) {
    const { name, surname, age } = props;

    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {surname}
            </td>
            <td>
                {age}
            </td>
        </tr>
    )
}