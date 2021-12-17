import React from 'react'
import './Favorite.css'

function FavoritePage() {
    return (
        <div style={{ width:'85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage
