import React, { FC, useState } from 'react'
import { Row, Container, Col, Card, CardBody } from 'reactstrap'

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TablePagination,
  TableRow
} from '@material-ui/core'

interface PaginationTableProps {
  count: number
  columnHeaders: string[]
  renderData: () => any
  onPageChange: (item: React.SetStateAction<number>) => any
}

const PaginationTable: FC<PaginationTableProps> = ({
  count,
  columnHeaders,
  renderData,
  onPageChange
}): React.ReactElement => {
  const [page, setPage] = useState(0)

  const renderHeaderRow = () => {
    return (
      <TableHead>
        <TableRow>
          {columnHeaders.map((header, index) => (
            <TableCell
              key={index}
              component="th"
              className="planet-cell-header"
            >
              <div dangerouslySetInnerHTML={{ __html: header }} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handlePageChange = (event: any, item: React.SetStateAction<number>) => {
    setPage(item)
    onPageChange(item)
  }

  const renderTableData = () => {
    return renderData()
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div>
                  <h5 style={{ fontWeight: '700' }}>Star Wars Planets</h5>
                </div>
                <div className="content">
                  <Table>
                    {renderHeaderRow()}
                    <TableBody>{renderTableData()}</TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    className="material-table__pagination"
                    count={count}
                    onPageChange={handlePageChange}
                    rowsPerPage={10}
                    page={page}
                    rowsPerPageOptions={[]}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PaginationTable
