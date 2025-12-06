const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="max-lg pr-6 pl-6">{children}</div>
		</>
	);
};

export default Container;
