import React, { useEffect } from "react"
import { Input } from "reactstrap"
import { useForm } from "react-hook-form"
import { useListFilter, useListStateContext } from "../../../components/ListWidget/constants"
import SearchButton from "../../../components/button/SearchButton"
import DownloadButton from "../../../components/button/DownloadButton"
import { CompanySchoolUpdateApi } from "../../../libs/apis/company-school/company-school-update.api"

const FilterSchool = () => {
  const { searchByFilter, filter } = useListFilter()
  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: filter || { month: null },
  })
  const { selectedList: getStateSelect, isLoading, totalSelected } = useListStateContext()

  const onSubmit = handleSubmit((val) => searchByFilter(val))

  const search = watch("search")

  useEffect(() => {
    reset(filter)
  }, [filter])

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="display-flex justify-content-between">
        <div className="display-flex">
          <Input
            type="search"
            name="search"
            className="mr-2"
            style={{ width: "300px" }}
            innerRef={register}
            id="search"
            placeholder="Search by school name"
          />
          <SearchButton isLoading={isLoading} />
        </div>
        <div
          className="display-flex justify-content-center align-items-center"
          style={{ gap: "4px" }}
        >
          {totalSelected > 0 && <div>Selected: {totalSelected}</div>}
          <DownloadButton
            key="execl"
            title="Download Excel"
            link={() => CompanySchoolUpdateApi.download(search, Object.values(getStateSelect))}
            fileName={() => `list_school_${new Date().getTime()}.xlsx`}
          >
            <i className="fa fa-file-excel-o" />
          </DownloadButton>
        </div>
      </div>
    </form>
  )
}

export default FilterSchool
