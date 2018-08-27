import React from 'react'
import Container from './Container'

export default class DustbinCopyOrMoveRestricted extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/examples/01%20Dustbin/Copy%20or%20Move%20restricted">
							Browse the Source
						</a>
					</b>
				</p>
				<p>
					This example demonstrates drop targets that can be disabled/enabled
          based on current drop effect, which users can switch between by
          holding down or releasing the alt key as they drag.
				</p>
				<Container />
			</div>
		)
	}
}
