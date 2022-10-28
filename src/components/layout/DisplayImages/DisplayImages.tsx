import {IFilterOptions, IImageItem} from "@/src/interfaces";
import React, {useEffect, useState} from "react";
import DImage from "@/components/layout/DisplayImages/ui/DImage/DImage";
import styles from "./DisplayImages.module.scss";
import useInput from "@/hooks/useInput";
import useFetchImages from "@/hooks/useFetchImages";
import FilterImages from "@/components/layout/filterImages/FilterImages";
import {CircularProgress} from "@mui/material";
import { useAutoAnimate } from '@formkit/auto-animate/react'


interface IDisplayImagesProps {
    count: number;
}

export function DisplayImages({count}: IDisplayImagesProps) {
   const [animationParent] = useAutoAnimate()

    const baseImagesAmount = 30;

    const {
        value: imagesAmount,
        onChange: onImagesAmountChange
    } = useInput(baseImagesAmount);
    const [offsetLevel, setOffsetLevel] = useState<number>(0);
    const [filteredCategories, setFilteredCategories] = useState([]);

    const {data, change, loading, error, setPage} = useFetchImages({
        _categories: [...filteredCategories],
        _amount: imagesAmount,
        _offset: offsetLevel,
    });


    const [currentItems, setCurrentItems] = useState<Array<IImageItem> | null>(null);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<IFilterOptions | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [displayLoading, setDisplayLoading] = useState(false);

    useEffect(() => {

        if(loading) {
            setDisplayLoading(true);
        } else if (data === null || currentItems === null) {
            setDisplayLoading(true);
        } else {
            setDisplayLoading(false);
        }

    }, [loading, data, currentItems]);
    useEffect(() => {

        if (data) {
            setCurrentItems(data.imageList);
            setCurrentFilterOptions(data.filterOptions);
            setNextPage(data.nextPage);
            setPrevPage(data.prevPage);
        }

    }, [data]);

    const offsetToPage = (off: number) => {
        return off + 1;
    }

    // @ts-ignore
    return (
        <div>
            {/*    <Box sx={{marginBottom: 40}}>*/}
            {/*    <Slider*/}
            {/*        aria-label="Temperature"*/}
            {/*        defaultValue={baseImagesAmount}*/}
            {/*        valueLabelDisplay="auto"*/}
            {/*        step={5}*/}
            {/*        min={10}*/}
            {/*        max={100}*/}
            {/*        onChange={onImagesAmountChange}*/}

            {/*    />*/}
            {/*        <span>{imagesAmount}</span>*/}

            {/*</Box>*/}

            <div className={styles.dImages} >
                {data !== null && (
                    <FilterImages filters={data.filterOptions} change={change}
                                  loading={loading} error={error} setPage={setPage} currentPage={offsetToPage(offsetLevel)} maxPage={data.pageCount}/>
                )}
                <div className={styles.imagesGrid} >

                    {
                        !displayLoading && currentItems?.map((item: IImageItem) => (
                            <DImage key={item.id} item={item} w={300} h={300}/>
                        ))
                    }

                    {
                        displayLoading && (
                            <>
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <CircularProgress/>

                                </div>
                            </>
                        )
                    }

                </div>
            </div>


        </div>
    )
}