interface ItemProps {
	title: string;
}

const Item = ({ title }: ItemProps) => {
	return (
		<>
			<div className="flex justify-center items-center outline-2 outline-zinc-500 m-4 p-4 rounded-2xl h-20 w-28">
				<h3 className="text-white">{title}</h3>
			</div>
		</>
	);
};

export default Item;
