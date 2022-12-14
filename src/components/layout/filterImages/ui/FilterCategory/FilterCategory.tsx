import {IFilterOption, TFilterIdDataType} from "@/src/interfaces";
import React, {useState} from "react";
import styles from "@/components/layout/filterImages/FilterImages.module.scss";
import {clsx} from "clsx";
import {motion} from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    Box,
    Checkbox,
    Collapse,
    FormControlLabel,
    FormGroup
} from "@mui/material";

type IFilterActionFunctionType = (filter: TFilterIdDataType) => () => void;


interface IFilterCategoryProps {
    filters: IFilterOption[];
    title: string;
    disabled: boolean;
    assignedFilters: TFilterIdDataType[];
    addFilter: IFilterActionFunctionType;
    removeFilter: IFilterActionFunctionType;
}

export const FilterCategory = ({
                                   title,
                                   filters,
                                   assignedFilters,
                                   addFilter,
                                   removeFilter,
                                   disabled
                               }: IFilterCategoryProps) => {

    const toggleFilter = (filter: TFilterIdDataType): () => void => {

        const isAssigned = assignedFilters.includes(filter);
        return isAssigned ? removeFilter(filter) : addFilter(filter)

    }

    const checkIsChosen = () => {
        let thisCategoryFilters = Array.from(filters.map(filter => filter.id));

        // check if one of the assigned filters is in this category
        return thisCategoryFilters.some(filter => assignedFilters.includes(filter))

    }

    const [opened, setOpened] = useState<boolean>(checkIsChosen);


    return (
        <div className={styles.category}>
            <div
                className={clsx(styles.category__title, opened && styles.active)}
                onClick={() => setOpened(v => !v)}
            >
                <span>
                    {title}
                </span>
                <motion.span animate={
                    {
                        rotate: opened ? 180 : 0,

                    }
                }>
                    <KeyboardArrowDownIcon/>
                </motion.span>
            </div>

            <FormGroup className={styles.category__group}>

                <Box sx={{width: "var(--min-menu-item-width)"}}>
                    <Collapse in={opened} timeout="auto" unmountOnExit>
                        {filters.map((_, index) => {
                                return (<FormControlLabel key={index}
                                                          control={<Checkbox
                                                              onChange={toggleFilter(_.id)}
                                                              defaultChecked={assignedFilters.includes(_.id)} disabled={disabled}/>}
                                                          label={_.name}/>)
                            }
                        )}
                    </Collapse>
                </Box>
                {/*{filters.map((_, index) => {*/}
                {/*        return (<FormControlLabel key={index}*/}
                {/*                                  control={<Checkbox*/}
                {/*                                      onChange={toggleFilter(_.id)}*/}
                {/*                                      defaultChecked={assignedFilters.includes(_.id)}/>}*/}
                {/*                                  label={_.name}/>)*/}
                {/*    }*/}
                {/*)}*/}

            </FormGroup>


        </div>
    )

}
