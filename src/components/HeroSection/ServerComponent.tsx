import Image from "next/image";

export const heading1 = (
    <>
        {/* Heading */}
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
            Experience an Exquisite Hotel Immersed in Rich History and Timeless Elegance.
        </p>
        <button className="btn-primary">Get Started</button>
    </>
);

export const section2 = (
    <>
        {/* Images */}
        <div className="md:grid hidden gap-8 grid-cols-1">
            <div className="rounded-2xl overflow-hidden h-48">
                <Image
                    src='/images/1.jpg'
                    alt="1"
                    width={5472}
                    height={3648}
                    className="img scale-animation"
                    priority
                />
            </div>

            <div className="grid grid-cols-2 gap-8 h-48">
                <div className="rounded-2xl overflow-hidden">
                    <Image
                        src='/images/2.jpg'
                        alt="2"
                        width={300}
                        height={300}
                        className="img scale-animation"
                        priority
                    />
                </div>
                <div className="rounded-2xl overflow-hidden">
                    <Image
                        src='/images/3.jpg'
                        alt="3"
                        width={300}
                        height={300}
                        className="img scale-animation"
                        priority
                    />
                </div>
            </div>

        </div>
    </>
);