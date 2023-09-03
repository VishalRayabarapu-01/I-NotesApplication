import React, { useContext, useEffect } from 'react'
import categoryContext from '../../contexts/CategoryContext'
import CategoryItem from './CategoryItem'
function Categories() {
  const obj = useContext(categoryContext)
  const {category,getCategories}=obj
  useEffect(()=>{
    getCategories();
  },[])
  return (
    <>
      {
        category.map((categoryItem)=>{
          return <CategoryItem category={categoryItem} />
        })
      }
    </>
  )
}

export default Categories
