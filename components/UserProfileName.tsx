interface Props {
  name: string
}

function UserProfileName({ name }: Props) {
  return (
    <div>{ name }</div>
  );
}

export default UserProfileName;