import React, { type ReactElement, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import MediaQuery from "react-responsive";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectStatusHomeSkeleton = (): ReactElement => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (percentage < 20) {
                setPercentage(percentage + 1);
            }
        }, 50);
    }, [percentage]);

    return (
        <>
            <div className={`mb-8 sm:mb-12 -mt-[10px]`}>
                <Skeleton
                    className="sm:max-w-[281px]"
                    height={34}
                    style={{
                        borderRadius: 30,
                    }}
                />
                <MediaQuery maxWidth={640}>
                    <Skeleton
                        width={221}
                        height={34}
                        style={{
                            borderRadius: 30,
                            marginTop: "10px",
                        }}
                    />
                </MediaQuery>
            </div>
            <Skeleton
                width={141}
                height={32}
                style={{
                    borderRadius: 30,
                }}
            />
            <div className="w-full mt-8">
                <div className="flex flex-wrap flex-col-reverse lg:flex-row">
                    <div className="lg:w-7/12">
                        <div className="border border-fieldOutline rounded-lg p-6">
                            <h4 className="text-16 leading-20  font-semibold font-inter-regular text-black false">
                                Notes
                            </h4>
                            <div className="flex pt-6">
                                <div className="c-userimg relative -top-1.5">
                                    <Skeleton
                                        circle
                                        width="30px"
                                        height="30px"
                                    />
                                </div>
                                <div className="flex-1 pl-2.5">
                                    <div className="flex justify-between items-center mb-2.5">
                                        <h5 className="text-14 font-inter-medium flex items-center">
                                            <Skeleton
                                                width={75}
                                                height={20}
                                                style={{
                                                    borderRadius: 30,
                                                    marginRight: "8px",
                                                }}
                                            />
                                            <Skeleton
                                                width={52}
                                                height={12}
                                                style={{
                                                    borderRadius: 30,
                                                }}
                                            />
                                        </h5>
                                    </div>
                                    <Skeleton count={2} />
                                    <Skeleton
                                        width={75}
                                        height={20}
                                        style={{
                                            borderRadius: 30,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-5/12 lg:pl-6 mb-2.5">
                        <div className="border border-fieldOutline rounded-lg py-4 px-6 mb-2.5 sm:mb-6 flex items-center">
                            <Skeleton
                                width={104}
                                height={12}
                                style={{
                                    borderRadius: 30,
                                }}
                            />
                        </div>

                        <div className="border border-fieldOutline rounded-lg p-6">
                            <div className="flex justify-between items-center">
                                <div className="text-16 leading-20 font-semibold font-inter-regular text-black false">
                                    Status
                                </div>
                                <span className="opacity-40 text-13 font-inter-regular ml-2">
                                    <Skeleton
                                        width={43}
                                        height={16}
                                        style={{
                                            borderRadius: 30,
                                        }}
                                    />
                                </span>
                            </div>
                            <div className="flex mt-6 items-center">
                                <Skeleton
                                    circle
                                    width="60px"
                                    height="60px"
                                    enableAnimation={false}
                                    style={{
                                        boxShadow: "inset 0 0 0 10px #fff",
                                        border: "5px solid #ebebeb",
                                    }}
                                />
                                <div className="flex-1 pl-4 text-sm">
                                    <h5 className="text-16 pb-2.5 font-inter-medium">
                                        <Skeleton
                                            width="179px"
                                            height="21px"
                                            style={{
                                                borderRadius: 30,
                                            }}
                                        />
                                    </h5>
                                    <p className="text-14">
                                        <Skeleton
                                            width="62px"
                                            height="24px"
                                            style={{
                                                borderRadius: 30,
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                            <MediaQuery minWidth={641}>
                                <div className=" mt-6">
                                    <Skeleton
                                        count={2}
                                        style={{
                                            borderRadius: 30,
                                        }}
                                    />
                                </div>
                            </MediaQuery>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectStatusHomeSkeleton;
