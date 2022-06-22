import React, { useEffect, useState } from 'react'
import { swAxios } from '../api'
import { TableRow, TableCell } from '@material-ui/core'
import Skeleton from 'react-loading-skeleton'
import PaginationTable from './pagination-table'

interface Planet {
  name: string
  url: string
  climate: string
  residents: string[]
  terrain: string
  diameter: string
  population: string
  surface_water: string
}

const headers = [
  'Name',
  'Climate',
  'Current # of Residents',
  'Terrains Found',
  'Population',
  'Surface Area Covered by Water (<span>km<sup>2</sup></span>)'
]

const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length

const AllPlanets = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [count, setCount] = useState(0)
  const [planets, setPlanets] = useState<Planet[]>([])

  useEffect(() => {
    const getPlanets = async () => {
      setLoading(true)
      try {
        const response = await swAxios.get('/planets/')
        const { data } = response
        setCount(data.count)
        const planets = data.results
        planets.sort((a: Planet, b: Planet) => (a.name > b.name ? 1 : -1))
        setPlanets(planets)
      } catch (error) {
        console.error(error)
        setError(true)
      }
      setLoading(false)
    }
    getPlanets()
  }, [])

  const handlePageChange = async (page_num: any) => {
    setLoading(true)
    try {
      const response = await swAxios.get('/planets', {
        params: { page: page_num + 1 }
      })
      const { data } = response
      setCount(data.count)
      const planets = data.results
      planets.sort((a: Planet, b: Planet) => (a.name > b.name ? 1 : -1))
      setPlanets(planets)
    } catch (error) {
      console.error(error)
      setError(true)
    }
    setLoading(false)
  }

  const parsePlanetInfo = (value: any, is_number = false) => {
    if (value === 'unknown') {
      return '?'
    } else if (is_number) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
    return value
  }

  const calculateWaterSurfaceArea = (
    name: string,
    diameter: string,
    surface_water: string
  ) => {
    if (surface_water === 'unknown' || diameter === 'unknown') {
      return '?'
    }
    const radius = parseInt(diameter) / 2
    const surfaceArea = 4 * 3.1415926535 * (radius * radius)
    return Math.round(surfaceArea * (parseInt(surface_water) / 100))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const renderData = () => {
    if (loading) {
      return (
        <>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={headers.length}>
              <Skeleton height={'2rem'} />
            </TableCell>
          </TableRow>
        </>
      )
    }
    if (!loading) {
      if (error) {
        return (
          <TableRow className="material-table__row">
            <TableCell
              colSpan={headers.length}
              className="pagination-border-bottom"
            >
              <div className="text-align-center">
                <h3>Error retrieving planets. Please reload page to retry.</h3>
              </div>
            </TableCell>
          </TableRow>
        )
      } else {
        if (isEmpty(planets)) {
          return (
            <TableRow className="material-table__row">
              <TableCell
                colSpan={headers.length}
                className="pagination-border-bottom"
              >
                <div className="text-align-center">
                  <h3>No Planets Available</h3>
                </div>
              </TableCell>
            </TableRow>
          )
        } else {
          return (
            <>
              {planets.map((planet) => (
                <TableRow>
                  <TableCell className="planet-cell">
                    <a href={planet.url} target="_blank" rel="noreferrer">
                      {parsePlanetInfo(planet.name)}
                    </a>
                  </TableCell>
                  <TableCell className="planet-cell">
                    {parsePlanetInfo(planet.climate)}
                  </TableCell>
                  <TableCell className="planet-cell">
                    {parsePlanetInfo(planet.residents.length)}
                  </TableCell>
                  <TableCell className="planet-cell">
                    {parsePlanetInfo(planet.terrain)}
                  </TableCell>
                  <TableCell className="planet-cell">
                    {parsePlanetInfo(planet.population, true)}
                  </TableCell>
                  <TableCell className="planet-cell">
                    {calculateWaterSurfaceArea(
                      planet.name,
                      planet.diameter,
                      planet.surface_water
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
        }
      }
    }
  }

  return (
    <PaginationTable
      count={count}
      columnHeaders={headers}
      renderData={renderData}
      onPageChange={handlePageChange}
    />
  )
}

export default AllPlanets
