import React from 'react'

export const Search = ({search}) => {
    return (
        <section className="col-md-8 form-group mx-auto mt-4">
        <h1 className="text-center text-white">Movie Info</h1>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={(e) => search(e)}
        />
      </section>
    )
}
