const RequisitionListSkeleton = () => {
    const skeletonItems = Array(3).fill(null);

    return (
        <div className="flow-root min-w-full mt-6">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="w-full grid grid-cols-12 rounded-md border-b gap-y-3 py-4"
                >
                    {/* Title skeleton */}
                    <div className="col-span-full mb-2">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                    </div>

                    {/* Date section */}
                    <div className="col-span-full md:col-span-10 grid grid-cols-subgrid">
                        {/* Start date skeleton */}
                        <div className="col-span-6 md:col-span-5 flex gap-x-1">
                            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="flex flex-col gap-1">
                                <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-28 animate-pulse"></div>
                            </div>
                        </div>

                        {/* End date skeleton */}
                        <div className="col-span-6 md:col-span-5 flex gap-x-1">
                            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="flex flex-col gap-1">
                                <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-28 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Destination skeleton */}
                    <div className="col-span-full md:col-span-10 flex gap-x-1">
                        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
                    </div>

                    {/* Status skeleton */}
                    <div className="col-span-full md:col-span-10 flex gap-x-1">
                        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                    </div>

                    {/* Button skeleton */}
                    <div className="col-span-full md:row-start-2 md:col-start-11 md:col-span-2 md:justify-self-end">
                        <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequisitionListSkeleton;
