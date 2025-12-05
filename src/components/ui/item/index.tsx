interface ItemProps {
  title : string
}

const Item = ({title} : ItemProps ) => {
  return (
    <>
      <div className="outline-2 outline-emerald-500 p-4 rounded-2xl">
        <h3 className="text-blue-950">{title}</h3>
      </div>
    </>
  )
}

export default Item