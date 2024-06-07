export interface ClothResponse {
    content: Content[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    size: number
    number: number
    sort: Sort2
    numberOfElements: number
    empty: boolean
}

export interface Content {
    clothId: number
    name: string
    image: string
    clothPrice: number
}

export interface Pageable {
    sort: Sort
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
}

export interface Sort {
    empty: boolean
    unsorted: boolean
    sorted: boolean
}

export interface Sort2 {
    empty: boolean
    unsorted: boolean
    sorted: boolean
}
