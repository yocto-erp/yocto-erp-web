import React, { useEffect } from "react"
import { Input } from "reactstrap"
import { useForm } from "react-hook-form"
import { useListFilter } from "../../../components/ListWidget/constants"
import SearchButton from "../../../components/button/SearchButton"
import DownloadButton from "../../../components/button/DownloadButton"
import { CompanySchoolUpdateApi } from "../../../libs/apis/company-school/company-school-update.api"

const FilterSchool = () => {
  const { searchByFilter, filter } = useListFilter()
  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: filter || { month: null },
  })

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
            placeholder="Search By Name, Region... "
          />
          <SearchButton />
        </div>
        <div>
          <DownloadButton
            key="execl"
            title="Download Excel"
            link={() => CompanySchoolUpdateApi.download(search)}
            fileName={() => `list_school_${new Date().getTime()}.csv`}
          >
            <i className="fa fa-file-excel-o" />
          </DownloadButton>
        </div>
      </div>
    </form>
  )
}

export default FilterSchool
