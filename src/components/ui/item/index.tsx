interface ItemProps {
  title : string
}

const Item = ({title} : ItemProps ) => {
  return (
    <>
      <div className="flex justify-center items-center outline-2 outline-emerald-500 m-4 p-4 rounded-2xl h-20 w-28">
        <h3 className="text-blue-950">{title}</h3>
      </div>
    </>
  )
}

export default Item