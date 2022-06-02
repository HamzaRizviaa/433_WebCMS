<Draggable
	key={data.id}
	draggableId={`draggable-${data.id}`}
	index={index}
	//	isDragDisabled={uploadeddatas.length <= 1}
>
	{(provided) => (
		<div
			key={index}
			ref={provided.innerRef}
			{...provided.draggableProps}
			style={{
				...provided.draggableProps.style
			}}
			className={classes.articleBuilder}
		>
			<div className={classes.draggableWrapperHead}>
				<div className={classes.leftDiv}>
					<div className={classes.grabIconDiv}>
						<span {...provided.dragHandleProps}>
							<Union style={{ cursor: 'grab' }} className={classes.grabIcon} />
						</span>
					</div>
					<div className={classes.wrapperHeading}>{heading}</div>
				</div>
				<div className={classes.rightDiv}>
					<div className={classes.deleteIconDiv}>
						<Deletes className={classes.deleteIcon} />
					</div>
					<div
						className={classes.expandIconDiv}
						onClick={() => {
							clickExpand();
						}}
					>
						{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</div>
				</div>
			</div>
			{clickExpandIcon ? <div></div> : <div></div>}
		</div>
	)}
</Draggable>;
